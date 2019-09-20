import React from 'react';
import { Link as LinkScroll } from 'react-scroll';

const SideNavBar = () => {
  return (
    <div className='sideNavBar'>
      <ul>
        <li>
          <LinkScroll
            activeClass='active'
            to='section1'
            spy={true}
            smooth={true}
            offset={0}
            duration={1100}
          >
            <i className='fas fa-minus fa-rotate-90'></i> <span>Home</span>
          </LinkScroll>
        </li>
        <li>
          <LinkScroll
            activeClass='active'
            to='section2'
            spy={true}
            smooth={true}
            offset={0}
            duration={1100}
          >
            <i className='fas fa-minus fa-rotate-90'></i> <span>Features</span>
          </LinkScroll>
        </li>
        <li>
          <LinkScroll
            activeClass='active'
            to='section3'
            spy={true}
            smooth={true}
            offset={0}
            duration={1100}
          >
            <i className='fas fa-minus fa-rotate-90'></i> <span>Contact</span>
          </LinkScroll>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;
