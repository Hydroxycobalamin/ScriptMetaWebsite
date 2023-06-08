export const SanitizeName = (name) => {
    console.log(name);
    var sanitizedName = name.replace("<", "")
                            .replace(">", "")
                            .replace(".proc[", ".proc.")
                            .replace("]", "")
    return sanitizedName;
}

export default SanitizeName;
