export const generateUrl = (page: string, tab: string, tag?: string) => {
  const searchParamsObj = new URLSearchParams({
    page,
    tab,
    ...(tag && { tag }),
  });

  return "/?" + searchParamsObj.toString();
};
