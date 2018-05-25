import React from 'react';
import GoMarkGithub from "react-icons/lib/go/mark-github";


const Footer = props => {
    return (
        <footer className="footer  has-background-white">
            <div className="level">
                <div className="level-item" title="@otaree">
                    <a href="https://github.com/otaree/Fcc-nightlife-coordination-app" className="" rel="noopener noreferrer" target="_blank">
                        <GoMarkGithub
                            size={30} 
                            style={{
                                color: "#888"
                            }}
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;