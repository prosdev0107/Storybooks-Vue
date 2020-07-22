import React from 'react'
import {TAB_GENERAL, TAB_IMAGE, TAB_TEXT, TAB_GIF} from "../constants/constants"
import { FormattedMessage } from 'react-intl'

const LeftMenu = ({stickers_menu_tab, changeTab}) => {


    return <div className="site-menubar">
        <div className="site-menubar-body">
            <ul className="site-menu">

                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === TAB_GENERAL ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(TAB_GENERAL);}} >
                        <i className="site-menu-icon fa fa-mobile-alt" aria-hidden="true"></i>
                        <span className="site-menu-title"><FormattedMessage id="sidebar.tab.general" /></span>
                    </a>
                </li>


                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === TAB_IMAGE ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(TAB_IMAGE);}} >
                        <i className="site-menu-icon fa fa-image" aria-hidden="true"></i>
                        <span className="site-menu-title"><FormattedMessage id="sidebar.tab.image" /></span>
                    </a>
                </li>


                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === TAB_TEXT ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(TAB_TEXT);}} >
                        <i className="site-menu-icon fa fa-font" aria-hidden="true"></i>
                        <span className="site-menu-title"><FormattedMessage id="sidebar.tab.text" /></span>
                    </a>
                </li>

                {/* <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === TAB_ANIMATION ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(TAB_ANIMATION);}} >
                        <i className="site-menu-icon fa fa-star" aria-hidden="true"></i>
                        <span className="site-menu-title"><FormattedMessage id="sidebar.tab.animation" /></span>
                    </a>
                </li> */}

                <li className="site-menu-item">
                    <a className={`animsition-link ${ stickers_menu_tab === TAB_GIF ? "active" : ""}`} href=""
                       onClick={(e) => {e.preventDefault();changeTab(TAB_GIF);}} >
                        <i className="site-menu-icon fa fa-star" aria-hidden="true"></i>
                        <span className="site-menu-title"><FormattedMessage id="sidebar.tab.gif" /></span>
                    </a>
                </li>

            </ul>
        </div>
    </div>
}

export default LeftMenu
