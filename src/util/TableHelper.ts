import FixMeLater from "../shared/types/fixMeLater.type";

export class TableHelper {
  public static getValue = (text: string | number | null | undefined) => {
    if (!text) {
      return "";
    } else {
      return text;
    }
  };

  public static getFilterDataSource = (data: FixMeLater, keys: string[], searchedText: string | null) => {
    const searchText = searchedText?.toLowerCase() || "";

    /* Check if data and keys are arrays */
    if (!Array.isArray(data) || !Array.isArray(keys)) {
      return [];
    }

    return data.filter((item: FixMeLater) =>
      keys.some((key) => {
        const value = item?.[key];
        return String(value)?.toLowerCase()?.includes(searchText);
      })
    ) as FixMeLater;
  };

  public static valueCompare = (key: string | undefined | null) => {
    if (!key) {
      return () => 0;
    }

    return (a: { [key: string]: FixMeLater }, b: { [key: string]: FixMeLater }) => {
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return a[key].localeCompare(b[key]);
      } else if (typeof a[key] === "number" && typeof b[key] === "number") {
        return a[key] - b[key];
      }

      return 0;
    };
  };

  public static getPagination = (size: number) => {
    return {
      current: 1,
      pageSize: 6,
      total: size,
      showSizeChanger: true,
      pageSizeOptions: ["6", "10", "20", "50", "100"]
    };
  };
}
