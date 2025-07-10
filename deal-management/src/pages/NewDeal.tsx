import DealForm from '../components/DealForm'

const NewDeal = () => {
  return (
    <div className='bg-white p-4 rounded-md shadow-md'>
        <h1 className='text-3xl font-medium text-center'>Submit New Deal</h1>
        <DealForm />
    </div>
  )
}

export default NewDeal