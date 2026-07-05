import { useEffect, useState } from "react";

// عدّاد تنازلي لانتهاء العروض — يحدث كل ثانية لكل منتج عليه خصم
const useOfferTimers = (products, onOfferExpired) => {
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      products.forEach((product) => {
        if (product.offerEndDate) {
          const distance = new Date(product.offerEndDate).getTime() - Date.now();
          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            newTimers[product._id] = `${days} يوم / ${hours} ساعة`;
          } else {
            newTimers[product._id] = "انتهى العرض";
            if (onOfferExpired) onOfferExpired();
          }
        } else {
          newTimers[product._id] = "عرض مستمر";
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [products]);

  return timers;
};

export default useOfferTimers;
