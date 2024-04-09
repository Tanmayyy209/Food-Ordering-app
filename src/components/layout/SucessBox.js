export default function SuccessBox({children}){
    return(
        <div className="text-center bg-green-200 p-4 mb-2 rounded-lg border border-green-300">
        {children}
       </div>
    )
}