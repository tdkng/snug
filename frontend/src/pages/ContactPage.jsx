const Contact = () => {
  document.body.style.backgroundColor = "var(--color-brown)";
  return (
    <div>
      <div className="py-24 flex justify-center align-middle text-dark-brown">
        <div className="bg-toffee drop-shadow-lg rounded-lg p-8 w-full max-w-xl">
          <h1 className="text-2xl pb-4 font-bold text-center">Contact Us</h1>
          <div className="flex flex-row justify-between mb-12">
            <form className="space-y-4 w-full">
              <div className="flex flex-col gap-4 lg:flex-row flex-wrap lg:space-x-4 space-y-4 lg:space-y-0">
                <input
                  className="w-[40%] px-3 py-2 bg-dark-toffee rounded"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
                <input
                  className="w-[40%] px-3 py-2 bg-dark-toffee rounded"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
                <input
                  className="w-[100%] px-3 py-2 bg-dark-toffee rounded"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                <input
                  className="w-[60%] px-3 py-2 bg-dark-toffee rounded"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                />
                <textarea
                  className="w-full h-32 px-3 py-2 bg-dark-toffee rounded"
                  type="text"
                  id="question"
                  name="question"
                  placeholder="What's your question?"
                ></textarea>
              </div>
              <div className="flex justify-center items-end mt-4 h-12">
                <button
                  type="submit"
                  className="w-[60%] h-full bg-brown text-white rounded hover:bg-light-brown transition-colors transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
