import { UserButton } from "@clerk/nextjs"

const Dashboard=()=>{
  return (
    <div>
      <p className="text-red-700"> hello dashboard</p>
      <UserButton/>
    </div>
  )
}
export default Dashboard