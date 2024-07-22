/* common application wide utility functions are placed here. */

import moment, { Moment } from "moment-timezone";

import type FixMeLater from "../shared/types/fixMeLater.type";

type FormData = { [key: string]: any };

export class General {
  public static titleCaseFunction(data: string) {
    return data?.toString().replace(/(^\w)|(\s+\w)/g, (letter) => letter?.toUpperCase());
  }

  public static inputWhiteSpaceRemove(value: any) {
    return value.replace(/^\s+/g, "");
  }

  public static firstLetterCapital(data: string) {
    return data?.charAt(0).toUpperCase() + data?.slice(1);
  }

  public static disableFutureDate = (current: Moment | null): boolean => {
    return !!current && current > moment().endOf("day");
  };

  public static searchFilterOnSelect = (input: any, option: any) => {
    const children = option?.children as unknown;

    if (typeof children === "string") return children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    return false;
  };

  public static numberWithCommas(x: any) {
    return x.toString().split(".")[0].length > 3
      ? x
          .toString()
          .substring(0, x.toString().split(".")[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
          "," +
          x.toString().substring(x.toString().split(".")[0].length - 3)
      : x.toString();
  }

  /* method used to check if key-values in obj1 matches with key-values in obj2 */
  public static matchSubset = (obj1: Record<string, any>, obj2: Record<string, any> | undefined) => {
    if (!obj2) return false;

    return Object.entries(obj1).every(([key, value]) => {
      return obj2[key] === value;
    });
  };

  public static convertDateToAPIFormat = (date: Moment) => {
    return moment(date).format("YYYYMMDD");
  };

  public static convertDateStringToMoment = (dateString: string | undefined | null) => {
    if (!dateString) return null;

    return moment(dateString, "YYYYMMDD");
  };

  /* converts file object to base64 image the return value can be directly consumed by src attributes in img tags.*/
  public static convertFileToBlobUrl = async (file: FixMeLater): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const blobUrl = URL.createObjectURL(file);
        resolve(blobUrl);
      } catch (error) {
        reject(error);
      }
    });
  };

  /* converts base 64 or blob data to file object */
  public static async blobUrlToFile(dataurl: string, fileName: string, fileExtension: string) {
    const response = await fetch(dataurl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: fileExtension });
  }

  public static getGUID = () => {
    return Math.random();
  };

  public static rawPdfStringToBlob = (pdfString: string): Blob => {
    const byteCharacters = new TextEncoder().encode(pdfString);
    const byteArray = new Uint8Array(byteCharacters);
    return new Blob([byteArray], { type: "application/pdf" });
  };

  public static trimFormValues = <T extends FormData>(formData: T): T => {
    const trimmedValues: Partial<T> = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      trimmedValues[key as keyof T] = typeof value === "string" ? value.trim() : value;
    });

    return trimmedValues as T;
  };
}
