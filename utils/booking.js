const getToDay = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
};

export const calculateBookingDetails = (checkIn, checkOut, pricePerNight) => {
    
    if (!checkIn || !checkOut || !pricePerNight) return { nights: 0, total: 0 };

    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();

    if (start < getToDay()) {
        console.warn('Check-in date cannot be in the past');
        return { nights: 0, total: 0 };
    }

    const mSec = end - start;

    const nights = Math.max(0, Math.floor(mSec / (1000 * 60 * 60 * 24)));

    return {
        nights,
        total: nights * pricePerNight,
    };
};
