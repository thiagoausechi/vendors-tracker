import Image from 'next/image'
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default function Header(props)
{
    return (
        <div className="row header">
            <div className="col-md-12">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Image
                        src="/assets/logo.svg"
                        alt="Vendors Tracker Logo"
                        width={25}
                        height={41}
                    />
                    <h3
                        className="text-center"
                        style={{ color: "white", marginLeft: "10px" }}
                    >
                        Vendors Tracker
                    </h3>
                </div>
            </div>
        </div>
    );
}