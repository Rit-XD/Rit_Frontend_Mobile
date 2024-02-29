import Image from 'next/image'
import './login.css'

export default function Login() {
  return (
    <div className="container">
      <div className="flex justify-center mt-20">
        <Image src="./logo_login.svg" alt="Rit" width={100} height={100} />
      </div>
      <h1 className="font-coconPro primary-gradient">Inloggen</h1>
      <form>
        <label>
          <span>E-mail</span>
          <input type="email" placeholder="Voorbeeld@rit.be" />
        </label>
        <label>
          <span>Wachtwoord</span>
          <input type="password" placeholder="Wachtwoord" />
        </label>
        <div>
          <label>
            <input type="checkbox" />
            <span>Onthoud mij</span>
          </label>
          <a href="#">Wachtwoord vergeten?</a>
        </div>
        <br />
        <button type="submit">Inloggen</button>
        <div>
          <button>Inloggen</button>
          <button>Registreren</button>
        </div>
      </form>
    </div>
  )
}
