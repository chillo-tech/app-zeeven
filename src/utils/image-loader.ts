const cn = (...classes: string[]) =>{
  return classes.filter(Boolean).join(' ')
}
const loaderProp =({ src }: {src: string}) => {
  return src;
}
export {cn, loaderProp};