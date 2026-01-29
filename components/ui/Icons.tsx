"use client";
import React from 'react';

interface IconProps {
    name: string;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function Icon({ name, size = 20, className = "", style = {} }: IconProps) {
    return (
        <span 
            className={`material-symbols-outlined select-none ${className}`} 
            style={{ fontSize: `${size}px`, ...style }}
        >
            {name}
        </span>
    );
}