export const HandleTemperature = (kelvin?: number) => {
    if (kelvin === undefined) {
        return 'N/A'; // Hoặc có thể trả về một giá trị khác phù hợp, như 'Chưa có dữ liệu'
    }
    const celsius: number = kelvin - 273.15;
    return `${Math.round(celsius)}°`; // Làm tròn giá trị đến số nguyên
}

export const findMaxNumber = (numbers:  ForecastItemResponse[]): number =>{
    if (numbers.length === 0) {
        return -1; // Trả về null nếu mảng rỗng
    }

    let maxNumber = numbers[0].main.temp; // Khởi tạo maxNumber với giá trị đầu tiên

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i].main.temp > maxNumber) {
            maxNumber = numbers[i].main.temp; // Cập nhật maxNumber nếu tìm thấy số lớn hơn
        }
    }

    return maxNumber; // Trả về số lớn nhất
}

export const findMinNumber=(numbers: ForecastItemResponse[]): number => {

    let minNumber = numbers[0].main.temp; // Khởi tạo minNumber với giá trị đầu tiên

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i].main.temp < minNumber) {
            minNumber = numbers[i].main.temp; // Cập nhật minNumber nếu tìm thấy số bé hơn
        }
    }

    return minNumber; // Trả về số bé nhất
}