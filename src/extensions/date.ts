declare global {
  interface Date {
    toFileName(): string;
  }
}

Date.prototype.toFileName = function (): string {
  var month = "" + (this.getMonth() + 1),
    day = "" + this.getDate(),
    year = this.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};

export {};
