import "../styles/header.css";
import Logo from "../components/logo";

const PAYPAL_LINK =
  "https://www.paypal.com/donate/?business=54HEQEQEAT2M8&no_recurring=0&item_name=Help+me+continue+making+open-source+projects&currency_code=USD";
const GITHUB_LINK =
  "https://gist.github.com/kyle-tennison/491123cd45b2c4c4afd7af3c9cd26f55";

export default function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <Logo />
        <a className="logo-font dark-cream">Ragposium</a>
      </div>
      <div className="right">
        <a className="support-button" href={PAYPAL_LINK} target="_blank">
          <i className="bi bi-envelope-heart"></i>&ensp;Support
        </a>
        <a className="github-logo" href={GITHUB_LINK} target="_blank">
          <i className="bi bi-github"></i>
        </a>
      </div>
    </div>
  );
}
