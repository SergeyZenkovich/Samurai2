export const updateObjectInArray = (items, objectPropName, itemId, newObjectProps) => {
    return items.map((u) => {
        if (u[objectPropName] === itemId) {
            return { ...u, ...newObjectProps }
        }
        return u;
    })
}