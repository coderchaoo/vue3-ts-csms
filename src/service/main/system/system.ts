import xcRequest from "../../index";

export function requestPageListData(url: string, queryInfo: any) {
  return xcRequest.post({
    url: url,
    data: queryInfo
  });
}
