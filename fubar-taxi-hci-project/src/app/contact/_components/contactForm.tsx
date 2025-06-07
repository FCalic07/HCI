"use client"; //zbog ovog moram odvojit jer tamo mi treba export metadata

export default function ContactForm() {

  const handleFormSubmitted = (event: React.FormEvent) => {
    event.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value;


    fetch('/api/send-email', {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({
            email,
            message
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json()) 
    .then(data => {
        if(data.error){
            alert(`Error while sending mail: ${data.error}`)
        }
        else{
            alert("Mail sent successfully!")
        }
    });
  };

  return (
    <>
      <form
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-8 flex flex-col gap-6 shadow-lg"
        onSubmit={handleFormSubmitted}
      >
        <h2 className="text-3xl font-semibold">Send us a message</h2>

        {/* Email input */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold pb-2">Your Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF604F]"
            required
          />
        </div>

        {/* Message input */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold pb-2">Your Message</label>
          <textarea
            id="message"
            placeholder="Write your message here..."
            className="p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF604F] h-32 resize-none"
            required
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="bg-[#FF604F] hover:bg-[#ff4433] transition-colors text-white font-semibold p-3 rounded-lg shadow-md"
        >
          Send Message
        </button>
      </form>
    </>
  );
}
