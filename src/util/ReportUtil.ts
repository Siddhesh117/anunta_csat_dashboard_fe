import moment from "moment-timezone";

export class ReportUtil {
  public static filterInfiniteScrollReport = (stateArr: any[], newArr: any[]) => {
    try {
      // Filter existing results from the state to avoid duplicates.
      const newListToBeAdded = newArr.filter((newItem) => !stateArr.some((oldItem) => newItem?.user_name === oldItem?.user_name));

      // Determine the starting key for new items.
      const startKey = stateArr.length > 0 ? stateArr[stateArr.length - 1].key + 1 : 1;

      // Format the new list with incremented keys.
      const formattedList = newListToBeAdded.map((item, index) => ({
        ...item,
        key: startKey + index
      }));

      // Concatenate the existing state array with the new formatted list.
      const concatedList = stateArr.concat(formattedList);

      // Sort the concatenated list by timestamp in descending order.
      const sortedList = concatedList.sort((a: any, b: any) => {
        const d1 = moment(a["time_stamp"], "DD/MM/YYYY HH-mm-ss");
        const d2 = moment(b["time_stamp"], "DD/MM/YYYY HH-mm-ss");
        return d2.diff(d1, "milliseconds") - d1.diff(d2, "milliseconds");
      });

      return sortedList;
    } catch (error) {
      console.error("Error in filterInfiniteScrollReport:", error);
      throw error;
    }
  };
}
