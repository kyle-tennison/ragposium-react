import "../styles/header.css";
import Logo from "../components/logo";
import { useEffect, useRef } from "react";

const PAYPAL_LINK =
  "https://www.paypal.com/donate/?business=54HEQEQEAT2M8&no_recurring=0&item_name=Help+me+continue+making+open-source+projects&currency_code=USD";
const GITHUB_LINK =
  "https://gist.github.com/kyle-tennison/491123cd45b2c4c4afd7af3c9cd26f55";

const SCROLL_THRESHOLD = 150;

export default function Header() {

  const headerElement = useRef<HTMLDivElement|null>(null);

  
  useEffect(()=>{
    window.addEventListener('scroll', () => {
      console.debug(window.scrollY)
      if (window.scrollY > SCROLL_THRESHOLD) {
        if (headerElement.current){
          // headerElement.current.style.opacity = "0"
          headerElement.current.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.10)"
        }
      }
      else {
        if (headerElement.current){
          // headerElement.current.style.opacity = "1"
          headerElement.current.style.boxShadow = "none"
        }
      }
    })
  }, [])

  return (
    <div className="header" ref={(el) => {headerElement.current = el}}>
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
