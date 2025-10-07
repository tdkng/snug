const About = () => {
  document.body.style.backgroundColor = 'var(--color-brown)';
  return (
    <div>
      <h1 className="py-12 flex justify-center align-middle text-toffee text-2xl font-bold">
        About Snug
      </h1>
      <div className="px-[10%] flex flex-col lg:flex-row justify-between items-center mb-12 text-toffee">
        <p>
          <strong>Snug</strong> helps you find the perfect café or study spot — whether you’re
          looking for a quiet nook to code, a cozy place to read, or a comfortable spot to meet
          friends. Instead of endless searching, Snug curates spaces that match your vibe.
        </p>
        <p>
          Built with <strong>Spring Boot</strong> on the backend and a modern <strong>React</strong> frontend,
          Snug integrates the <strong>Google Places API</strong> to provide real-time recommendations with
          detailed information like ambiance, Wi-Fi availability, and open hours.
        </p>
        <p>
          Snug was designed to make exploring your city more intentional — blending functionality
          with comfort. Whether you're a student, remote worker, or café enthusiast, Snug helps
          you feel at home wherever you go.
        </p>
      </div>
      <div>

      </div>
    </div>
  )
}

export default About