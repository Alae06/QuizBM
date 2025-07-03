import React from 'react';

const StatsCard = ({ title, value }) => {
    return (
        <div className="bg-white p-4 shadow rounded-lg text-center">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
};

export default StatsCard;
