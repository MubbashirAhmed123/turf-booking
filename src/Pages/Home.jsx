import bgImg from './../assets/bg.jpg'
import { Link } from 'react-router-dom'
import { turf } from '../data/data'


function Home() {
  return (
    < >
      <div className='sm:mt-10 p-5 rounded-md flex flex-col justify-between items-center  sm:flex-row sm:justify- sm:gap-10'>
        <div className='mt-5'>
          <h1 className=' font-bold text-2xl md:text-4xl mb-10'>Turf Play Ground</h1>
          <p className='leading-relaxed w-full text-gray-800 font-semibold md:text-lg sm:w-[300px] lg:w-[500px]'>Looking for a convenient way to book turf for your favorite sports activities? Look no further! Our turf booking platform offers a seamless and hassle-free experience for all your sporting needs.</p>
        </div>

        <div className='order-first sm:order-1 flex justify-center items-center '>
          <img src={bgImg} alt="" className=' shadow-white/80 mx-auto rounded-md drop-shadow-lg lg:w-[600px]' />
        </div>
      </div>

      <hr className='mt-10' />

      <div className='flex justify-center gap-10 mt-5 py-2 px-2 sm:gap-20 md:gap-44'>
        <div className='py-2 px-2 rounded shadow font-semibold bg-green-400  hover:bg-green-500 ld hover:text-gray-900 transition'>
          <Link to='/booking' className=' '>Book Turf</Link>
        </div>
        <div className='py-2 px-2 rounded shadow bg-green-400 font-semibold hover:bg-green-500 transition'>
          <Link to='/booked_slots'>See Booked Slots</Link>
        </div>
      </div>


      <div className='mt-10 p-5 flex flex-wrap gap-20 '>
        {
          turf.map((ele,index) => (

            <div key={index} className=" w-[400px] h-auto relative rounded-md  overflow-hidden shadow-lg shadow-black/20 hover:scale-110 transition cursor-pointer bg-green-300 ">
              <img className="w-full h-[200px] object-cover " src={ele.img} alt=''/>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{ele.turfName}</div>
                  <p className="text-gray-700 text-base">
                    {ele.desc}
                  </p>
                </div>
                <div className="   mt-5 px-6 pt-4 pb-2 ">
                  <img src={ele.cricket} alt="" className='h-10 absolute bottom-1 ' />
                  <img src={ele.football} alt="" className='h-10 absolute bottom-1 left-[90px]' />
                  <img src={ele.vallyball} alt="" className='h-10 absolute bottom-1 left-[180px]' />
                </div>
            </div>

          ))
        }
      </div>

    </>
  )
}

export default Home