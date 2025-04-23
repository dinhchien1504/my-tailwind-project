export const HandleDayTime = (): boolean => {
    const now = new Date();
    const hour = now.getUTCHours() + 7; // Cộng thêm 7 giờ để chuyển sang giờ Việt Nam
    const vietnamHour = hour >= 24 ? hour - 24 : hour; // Đảm bảo giờ không vượt quá 24
    console.log(vietnamHour);
    return vietnamHour >= 6 && vietnamHour < 18;
};

export const handleBeforeDay = (dateString: string): boolean => {
    // Tạo đối tượng Date từ chuỗi
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    // Lấy ngày hiện tại
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // So sánh hai ngày
    const isBefore = targetDate < currentDate;
    return isBefore
}

export const handleDayOfWeek = (dateString: string): string => {
    // Tạo đối tượng Date từ chuỗi
    const date = new Date(dateString);

    // Tạo đối tượng Date cho ngày hiện tại
    const currentDate = new Date();

    // So sánh ngày
    const isToday: boolean =
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() === currentDate.getDate();

    if (isToday) {
        return ("Hôm nay")
    } else {
        // Lấy số ngày trong tuần (0 = Chủ nhật, 1 = Thứ hai, ..., 6 = Thứ bảy)
        const dayOfWeek: number = date.getDay();

        // Chuyển đổi số ngày thành tên ngày
        const dayNames: string[] = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        const dayName: string = dayNames[dayOfWeek];

        return dayName
    }
}

export const formatTo12HourTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC' // Thêm timezone cố định
    });
  };
  export const formatDayName = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", { weekday: "long" }); // ví dụ: 'Thứ hai'
  };

export const handleFomart = (dateString: string) => {
    // Tạo đối tượng Date từ chuỗi
    const date = new Date(dateString);

    // Lấy tháng (0 - 11, vì vậy cần cộng 1)
    const month: number = date.getMonth() + 1; // Tháng (1 - 12)
    const day: number = date.getDate(); // Ngày (1 - 31)

    // Chuyển đổi thành định dạng "MM/DD"
    const formattedDate: string = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    return formattedDate
}

export const capitalizeEachWord = (text: string): string => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };