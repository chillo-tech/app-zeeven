export const getFormattedDate = (entry: Date) => {
	const year = entry.getFullYear();
	const month = `0${entry.getMonth() + 1}`.slice(-2);
	const day = `0${entry.getDate()}`.slice(-2);
	return `${day}/${month}/${year}`;
};
export const getInputFormattedDate = (entry: Date) => {
	const year = entry.getFullYear();
	const month = `0${entry.getMonth() + 1}`.slice(-2);
	const day = `0${entry.getDate()}`.slice(-2);
	return `${year}-${month}-${day}`;
};

export const getFormattedTime = (entry: Date) => {
	const hours = `0${entry.getHours()}`.slice(-2);
	const minutes = `0${entry.getMinutes()}`.slice(-2);
	return `${hours}:${minutes}`;
};

const getWeekNumber = (entry: Date) => {
	// Copy date so don't modify original
	const date = new Date(Date.UTC(entry.getFullYear(), entry.getMonth(), entry.getDate()));
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
	// Get first day of year
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	return Math.ceil((((Number(date) - Number(yearStart)) / 86400000) + 1) / 7);
	// Return array of year and week number

}

export const getDayAndMonthLabel = (entry: Date) => {
	const days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
	const months = ["Jan.", "Fev.", "Mars", "Avr.", "MaI", "Juin",
		"Jul.", "Août", "Sep.", "Oct.", "Nov.", "Dec."
	];
	return [days[entry.getDay()], months[entry.getMonth()]];
}

export const getDisplayedDate = (entry: string = "") => {
	if (!entry.trim().length) {
		return entry;
	}

	const [dayOfDate, month, year] = getFormattedDate(new Date(entry)).split('/');
	const [dayOfWeekLabel, monthLabel] = getDayAndMonthLabel(new Date(entry));
	return `${dayOfWeekLabel}, ${dayOfDate} ${monthLabel}`;

};

export const getHumanDate = (entry: Date) => {
  console.log('====================================');
  console.log(typeof entry);
  console.log('====================================');
	if (entry === null) {
		return entry;
	}

	const [dayOfDate, month, year] = getFormattedDate(entry).split('/');
	const [dayOfWeekLabel, monthLabel] = getDayAndMonthLabel(entry);
	return `${dayOfWeekLabel}, ${dayOfDate} ${monthLabel}`;

};

export const tomorrow = () => {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return

}