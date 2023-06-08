export const SanitizeName = (name) => {
    var sanitizedName = name.replace("<", "")
                            .replace(">", "")
                            .replace(".proc[", ".proc.")
                            .replace("]", "")
    return sanitizedName;
}

export default SanitizeName;
