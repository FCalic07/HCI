"use client";

import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarOn } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type Driver = {
  id: number;
  username: string;
};

type Ride = {
  id: number;
  price: string;
  startTime: string;
  endTime: string;
};

type IncomeStats = {
  total: number;
  month: number;
  today: number;
  driver1: number;
  driver2: number;
  driver1Rides: number;
  driver2Rides: number;
  todayRides: number;
  daysOfMonth: string[];
  incomePerDay: number[];
  months: string[];
  incomes: number[];
};

const monthNamesCroatian = [
  "Siječanj",
  "Veljača",
  "Ožujak",
  "Travanj",
  "Svibanj",
  "Lipanj",
  "Srpanj",
  "Kolovoz",
  "Rujan",
  "Listopad",
  "Studeni",
  "Prosinac",
];

function formatDateToDDMMYYYY(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedDay}/${formattedMonth}/${year}`;
}

const IncomeComponent: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [incomeStats, setIncomeStats] = useState<IncomeStats | null>(null);
  const today = new Date();

  useEffect(() => {
    const db = getDatabase();
    // Fetch drivers
    const driversRef = ref(db, "GellaTaxi/Taxi");
    onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const driverList = Object.keys(data).map((key) => ({
          id: Number(key),
          username: data[key].username || `Vozac ${key}`,
        }));
        setDrivers(driverList);
      }
    });

    // Fetch rides and calculate stats
    const ridesRef = ref(db, "GellaTaxi/report");
    onValue(ridesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      let total = 0;
      let month = 0;
      let todayIncome = 0;
      let driver1 = 0,
        driver2 = 0;
      let driver1Rides = 0,
        driver2Rides = 0,
        todayRides = 0;
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      // For chart2: daily income in this month
      const totalPriceByDay: { [day: string]: number } = {};
      // For chart3: monthly income by year
      const monthlyIncome: { [month: string]: number } = {};

      Object.values(data).forEach((rideRaw) => {
        const ride = rideRaw as Ride;
        const price = parseFloat(ride.price);
        if (!isNaN(price)) {
          total += price;
        }

        // Parse dates
        const startDateStr = ride.startTime?.split(" ")[1];
        const endDateStr = ride.endTime?.split(" ")[1];
        if (!startDateStr || !endDateStr) return;

        // "DD/MM/YYYY"
        const [startD, startM, startY] = startDateStr.split("/").map(Number);
        const rideDate = new Date(startY, startM - 1, startD);

        // Monthly income
        if (startM === currentMonth && startY === currentYear) {
          month += price;
          // Chart2: income per day
          const dayKey = startD.toString();
          totalPriceByDay[dayKey] = (totalPriceByDay[dayKey] || 0) + price;
        }

        // Today's income
        const formattedToday = formatDateToDDMMYYYY(today);
        const formattedRide = formatDateToDDMMYYYY(rideDate);
        if (formattedToday === formattedRide) {
          todayIncome += price;
          todayRides++;
          if (ride.id === 1) {
            driver1 += price;
            driver1Rides++;
          }
          if (ride.id === 2) {
            driver2 += price;
            driver2Rides++;
          }
        }

        // Chart3: monthly income
        const monthKey = `${startY}-${startM.toString().padStart(2, "0")}`;
        monthlyIncome[monthKey] = (monthlyIncome[monthKey] || 0) + price;
      });

      // Prepare data for charts
      const daysOfMonth = Object.keys(totalPriceByDay)
        .sort((a, b) => Number(a) - Number(b))
        .map((day) => {
          const date = new Date(currentYear, currentMonth - 1, Number(day));
          return formatDateToDDMMYYYY(date);
        });
      const incomePerDay = Object.keys(totalPriceByDay)
        .sort((a, b) => Number(a) - Number(b))
        .map((day) => totalPriceByDay[day]);

      const months = Object.keys(monthlyIncome).sort();
      const incomes = months.map((month) => monthlyIncome[month]);

      setIncomeStats({
        total,
        month,
        today: todayIncome,
        driver1,
        driver2,
        driver1Rides,
        driver2Rides,
        todayRides,
        daysOfMonth,
        incomePerDay,
        months,
        incomes,
      });
    });
  }, [setDrivers]);

  if (!incomeStats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Get today's formatted date and day
  const formattedDate = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;
  const currentMonthName = monthNamesCroatian[today.getMonth()];

  return (
    <div className="income bg-gray-50 py-8 px-4">
      <div className="section_header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Income</h1>
      </div>

      <div className="content-wrapper">
        {/*CARDS */}
        <div className="cards grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-base">
          {/* Total Income */}
          <div
            className="
        relative max-w-full rounded-2xl shadow-xl p-6
        bg-gradient-to-br from-blue-900 via-blue-100 to-blue-500/70
        backdrop-blur-md
        overflow-hidden
        "
          >
            {/* Decorative blurred circles for glass effect */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-900 rounded-full blur-2xl z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-blue-600/30 rounded-full blur-2xl z-0"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Top */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white tracking-wide drop-shadow">
                  FUBAR Taxi
                </h2>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png"
                  className="opacity-90 drop-shadow"
                  alt="icon"
                  width={30}
                  height={30}
                />
              </div>

              {/* Middle */}
              <div className="mb-8">
                <p className="text-black/70 font-medium tracking-wider ">
                  Ukupan prihod:
                </p>
                <h1 className="text-2xl font-bold text-blue-950 drop-shadow">
                  {incomeStats.total.toFixed(2)} KM
                </h1>
              </div>

              {/* Bottom */}
              <div className="flex justify-end items-end">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="Visa"
                  className="object-contain drop-shadow"
                  height={60}
                  width={60}
                />
              </div>
            </div>
          </div>

          {/* Total Month Income */}
          <div
            className="
        relative max-w-full rounded-2xl shadow-xl p-6
        bg-gradient-to-br from-blue-900 via-blue-100 to-blue-500/70
        backdrop-blur-md
        overflow-hidden
        "
          >
            {/* Decorative blurred circles for glass effect */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-900 rounded-full blur-2xl z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-blue-600/30 rounded-full blur-2xl z-0"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Top */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white tracking-wide drop-shadow">
                  FUBAR Taxi
                </h2>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png"
                  className="opacity-90 drop-shadow"
                  alt="icon"
                  width={30}
                  height={30}
                />
              </div>

              {/* Middle */}
              <div className="mb-8">
                <p className="text-black/70 font-medium tracking-wider">
                  Ukupan prihod za mjesec: {currentMonthName}
                </p>
                <h1 className="text-2xl font-bold text-blue-950 drop-shadow">
                  {incomeStats.month.toFixed(2)} KM
                </h1>
              </div>

              {/* Bottom */}
              <div className="flex justify-end items-end">
                {/* You can use an image or icon for Visa, here’s the image version: */}
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="Visa"
                  className="object-contain drop-shadow"
                  height={60}
                  width={60}
                />
                {/* Or, if you prefer the icon, uncomment below and comment out the image above:
      <i className="bx bxl-visa text-2xl text-blue-400 drop-shadow"></i>
      */}
              </div>
            </div>
          </div>

          {/* Total Income Today */}
          <div
            className="
        relative max-w-full rounded-2xl shadow-xl p-6
        bg-gradient-to-br from-blue-900 via-blue-100 to-blue-500/70
        backdrop-blur-md
        overflow-hidden
        "
          >
            {/* Decorative blurred circles for glass effect */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-900 rounded-full blur-2xl z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-blue-600/30 rounded-full blur-2xl z-0"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Top */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white tracking-wide drop-shadow">
                  FUBAR Taxi
                </h2>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png"
                  className="opacity-90 drop-shadow"
                  alt="icon"
                  height={30}
                  width={30}
                />
              </div>

              {/* Middle */}
              <div className="mb-8">
                <p className="text-black/70 font-medium tracking-wider">
                  Ukupan prihod danas: {formattedDate}
                </p>
                <h1 className="text-2xl font-bold text-blue-950 drop-shadow">
                  {incomeStats.today.toFixed(2)} KM
                </h1>
              </div>

              {/* Bottom */}
              <div className="flex justify-end items-end">
                {/* You can use an image or icon for Visa, here’s the image version: */}
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="Visa"
                  className="object-contain drop-shadow"
                  width={60}
                  height={60}
                />
                {/* Or, if you prefer the icon, uncomment below and comment out the image above:
          <i className="bx bxl-visa text-2xl text-blue-400 drop-shadow"></i>
          */}
              </div>
            </div>
          </div>
        </div>

        {/* Driver Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto items-baseline">
          {/* Driver 1 */}
          <div className="totalPricePerDriver1 bg-white rounded-lg shadow p-6">
            <div className="flex-col  items-center">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-black">
                  {drivers[0]?.username}
                </h3>
                <i className="bx bx-taxi text-yellow-600 text-2xl"></i>
              </div>
              <div className="mb-2">
                <p className="text-gray-600">Današnji prihod po vozaču:</p>
                <p className="text-2xl font-bold text-blue-950">
                  {incomeStats.driver1.toFixed(2)} KM
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 max-w-xs">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FontAwesomeIcon
                      icon={faCarOn}
                      className="w-6 h-6 text-blue-600"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Ukupno vožnji danas:
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {incomeStats.driver1Rides}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Driver 2 */}
          <div className="totalPricePerDriver2 bg-white rounded-lg shadow p-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-black">
                  {drivers[1]?.username}
                </h3>
                <i className="bx bx-taxi text-yellow-600 text-2xl"></i>
              </div>
              <div className="mb-2">
                <p className="text-gray-600">Današnji prihod po vozaču:</p>
                <p className="text-2xl font-bold text-blue-950">
                  {incomeStats.driver2.toFixed(2)} KM
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 max-w-xs">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FontAwesomeIcon
                      icon={faCarOn}
                      className="w-6 h-6 text-blue-600"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Ukupno vožnji danas:
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {incomeStats.driver2Rides}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chart 1: Bar - Današnje vožnje */}
          <div className="bg-white rounded-lg shadow p-4">
            <Bar
              data={{
                labels: ["Ukupno", drivers[0]?.username, drivers[1]?.username],
                datasets: [
                  {
                    label: "Današnje vožnje",
                    backgroundColor: ["#ef4444", "#22c55e", "#3b82f6"],
                    data: [
                      incomeStats.todayRides,
                      incomeStats.driver1Rides,
                      incomeStats.driver2Rides,
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Današnje vožnje",
                  },
                },
                scales: {
                  x: { title: { display: true, text: "Vozači" } },
                  y: {
                    title: { display: true, text: "Broj vožnji danas" },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
          {/* Chart 2: Line - Prihod po danima */}
          <div className="bg-white rounded-lg shadow p-4">
            <Line
              data={{
                labels: incomeStats.daysOfMonth,
                datasets: [
                  {
                    label: `Prihod po danima za ${currentMonthName}`,
                    backgroundColor: "rgba(59,130,246,0.2)",
                    borderColor: "#3b82f6",
                    data: incomeStats.incomePerDay,
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: `Prihod po danima za ${currentMonthName}`,
                  },
                },
                scales: {
                  x: { title: { display: true, text: "Datum" } },
                  y: {
                    title: { display: true, text: "Prihod" },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
          {/* Chart 3: Line - Godišnji prihod */}
          <div className="bg-white rounded-lg shadow p-4">
            <Line
              data={{
                labels: incomeStats.months,
                datasets: [
                  {
                    label: "Prihod po mjesecima",
                    backgroundColor: "rgba(16,185,129,0.2)",
                    borderColor: "#10b981",
                    data: incomeStats.incomes,
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Prihod po mjesecima",
                  },
                },
                scales: {
                  x: { title: { display: true, text: "Mjesec" } },
                  y: {
                    title: { display: true, text: "Prihod" },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeComponent;
