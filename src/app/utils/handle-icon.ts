

export const HandleIcon = (icon?: string) => {
    if (icon === undefined) {
        return "/images/cloudy-sunny.png"; // Hoặc có thể trả về một giá trị khác phù hợp, như 'Chưa có dữ liệu'
    }
    switch (icon) {
        case "01d":
            return "/images/weather-icon/01d.png"
        case "01n":
            return "/images/weather-icon/01n.png"
        case "02d":
            return "/images/weather-icon/02d.png"
        case "02n":
            return "/images/weather-icon/02n.png"
        case "03d":
            return "/images/weather-icon/03d.png"
        case "03n":
            return "/images/weather-icon/03n.png"
        case "04d":
            return "/images/weather-icon/04d.png"
        case "04n":
            return "/images/weather-icon/04n.png"
        case "09d":
            return "/images/weather-icon/09d.png"
        case "09n":
            return "/images/weather-icon/09n.png"
        case "10d":
            return "/images/weather-icon/10d.png"
        case "10n":
            return "/images/weather-icon/10n.png"
        case "11d":
            return "/images/weather-icon/11d.png"
        case "11n":
            return "/images/weather-icon/11n.png"
        case "13d":
            return "/images/weather-icon/13d.png"
        case "13n":
            return "/images/weather-icon/13n.png"
        case "50d":
            return "/images/weather-icon/50d.png"
        case "50n":
            return "/images/weather-icon/50n.png"
        default:
            break;
    }
    return "/images/cloudy-sunny.png";
}


 export const  findMostFrequentElement = (arr: number[]): number => {
    const frequencyMap: { [key: number]: number } = {};
    
    // Đếm số lần xuất hiện của từng phần tử
    for (const num of arr) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }

    let maxCount = 0;
    let mostFrequentElement: number = 0;

    // Tìm phần tử có số lần xuất hiện nhiều nhất
    for (const num in frequencyMap) {
        if (frequencyMap[num] > maxCount) {
            maxCount = frequencyMap[num];
            mostFrequentElement = Number(num);
        }
    }

    return mostFrequentElement;
}

export const HandleIconForecast = (icon: number) => {

    switch (icon) {
        case 1:
            return "/images/weather-icon/01d.png"
        case 2:
            return "/images/weather-icon/02d.png"
        case 3:
            return "/images/weather-icon/03d.png"
        case 4:
            return "/images/weather-icon/04d.png"
        case 9:
            return "/images/weather-icon/09d.png"
        case 10:
            return "/images/weather-icon/10d.png"
        case 11:
            return "/images/weather-icon/11d.png"
        case 13:
            return "/images/weather-icon/13d.png"
        case 50:
            return "/images/weather-icon/50d.png"
        default:
            break;
    }
    return "/images/cloudy-sunny.png";
}
