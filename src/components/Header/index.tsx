import { HeaderContainer } from './styles'
import logo from '../../assets/Logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={20}></Timer>
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={20}></Scroll>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
