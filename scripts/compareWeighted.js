//@ts-check

/**
 * to be used in array.sort()
 * @param {{weight: number}} item1
 * @param {{weight: number}} item2
 */
export default (item1, item2) => {
    return (item1.weight || Infinity) - (item2.weight || Infinity)
}