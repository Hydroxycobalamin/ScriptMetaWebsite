export const filterDataBySearchQuery = (data, searchQuery) => {
    return data.filter((object) => {
        return Object.keys(object).some((key) => {
            const value = object[key];
            if (typeof value === "string") {
                return value.toLowerCase().includes(searchQuery.toLowerCase());
            }
            if (Array.isArray(value)) {
                return value.some((item) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            return false;
        });
    });
};
