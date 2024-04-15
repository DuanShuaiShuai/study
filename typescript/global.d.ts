declare namespace console {
  function log(message?: any): void;
  function error(message?: any): void;
}
type timeHandler = () => void;
declare function setTimeout(handler: timeHandler, miliseconds: number): void;
declare function setInterval(handler: timeHandler, miliseconds: number): void;
