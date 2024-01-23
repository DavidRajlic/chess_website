import React from 'react';
import './layout-styles.css';
const Layout = ({ Image, Content }) => {
    return (
        <div className="container">

            <div className="flex">
                <div className="content">
                    <Content />
                </div>
            </div>
        </div>
    );
};

export default Layout;
