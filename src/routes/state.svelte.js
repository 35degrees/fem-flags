class DarkMode {
	isDark = $state(false);

	toggleDarkMode() {
		this.isDark = !this.isDark;
	}
}

export const darkMode = new DarkMode();

class MaxFlags {
	flagCount = $state(40);

	addFlags() {
		this.flagCount = this.flagCount + 40;
	}

	reset() {
		this.flagCount = 40;
	}
}

export const maxFlags = new MaxFlags();
