import { useState } from "react";

export default function useToMuiJson() {
  const [muiJson, setMuiJson] = useState("");
  const removeWhiteSpace = (string: string) => {
    if (string === null) {
      return "";
    }
    return string.replace(/\s/g, "");
  };
  const convertCSSStyles = (array: any) =>
    array
      .map((item: string) => {
        const regex = / (.*)/gm;

        const afterRegex = regex.exec(item);
        if (afterRegex !== null) {
          const cssStyleNameRegex = /(.*):/gm;
          const cssStyleValueRegex = /:(.*)/gm;

          let cssStyleName: any = cssStyleNameRegex.exec(afterRegex[1]);
          let cssStyleValue: any = cssStyleValueRegex.exec(afterRegex[1]);

          cssStyleName = cssStyleName[1].includes("-")
            ? snakeToCamel(removeWhiteSpace(cssStyleName[1]))
            : removeWhiteSpace(cssStyleName[1]);
          cssStyleValue = !isNaN(cssStyleValue[1])
            ? parseInt(removeWhiteSpace(cssStyleValue[1]))
            : removeWhiteSpace(cssStyleValue[1]);

          return {
            [cssStyleName]: cssStyleValue,
          };
        }
        return afterRegex;
      })
      .filter((value: any) => value !== null);

  const snakeToCamel = (str: string) =>
    str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
      );

  const classNameRegex = /\.(.*)-/gm;
  const subClassNameRegex = /-(.*){/gm;
  const cssStylesRegex = /\{([^}]+)\}/gm;

  const convertToMui = (cssList: string) => {
    const cssObject: any = cssList.split(",").map((cssItem) => {
      const classNameObject: any = classNameRegex.exec(cssItem);
      const className = classNameObject[1];
      const subClassObject: any = subClassNameRegex.exec(cssItem);
      const subClass: any = removeWhiteSpace(subClassObject[1]);
      const cssStylesObject: any = cssStylesRegex.exec(cssItem);
      const cssStyles: any = cssStylesObject[1].split(";");

      return {
        [className]: {
          [subClass]: Object.assign({}, ...convertCSSStyles(cssStyles)),
        },
      };
    });
    setMuiJson(JSON.stringify(Object.assign({}, ...cssObject), null, 2));
  };

  return {
    muiJson,
    convertToMui: (cssList: string) => convertToMui(cssList),
  };
}
