import React from 'react';

const ListItems = () => {
    return (
        <div className='shadow-md rounded-md p-3 w-2/3 gap-5 bg-blue-900'>
            <div>
                <h1 className='font-bold py-4 px-2 text-xl  text-white'>Sales by State</h1>
            </div>
            <div>
                <table className="table-auto text-white    w-full">
                    <thead>
                        <tr className='text-white text-xl bg-red-400 '>
                            <th className='px-4 py-2'>State</th>
                            <th className='px-4 py-2'>Sales</th>
                            <th className='px-4 py-2'>Value</th>
                            <th className='px-4 py-2'>Bounce Percentage</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr className='hover:bg-green-600'>                          
                            <td className=' px-4 py-2 font-bold '>California</td>
                            <td className=' px-4 py-2'>100</td>
                            <td className=' px-4 py-2'>$5000</td>
                            <td className=' px-4 py-2'>20%</td>
                        </tr>
                        <tr  className='hover:bg-green-600'>
                            <td className=' px-4 py-2 font-bold'>Texas</td>
                            <td className=' px-4 py-2'>800</td>
                            <td className=' px-4 py-2'>$4000</td>
                            <td className=' px-4 py-2'>15%</td>
                        </tr>
                        <tr  className='hover:bg-green-600'>
                            <td className=' px-4 py-2 font-bold'>New York</td>
                            <td className=' px-4 py-2'>1200</td>
                            <td className=' px-4 py-2'>$6000</td>
                            <td className=' px-4 py-2'>25%</td>



                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TopSalesArea = () => {
  return (
    <div className='p-4 bg-blue-900 text-white rounded-xl font-bold '>
      <div>
        <h1 className='font-bold text-xl'>Top Sales</h1>
      </div>
      <div className="mt-5 shadow-2xl ">
        <table className="table-auto ">
          <thead className='bg-red-400 '>
            <tr className='font-bold'>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Sales Amount</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            <tr className='hover:bg-green-600'>
              <td className=" px-4 py-2">1</td>
              <td className=" px-4 py-2">California</td>
              <td className=" px-4 py-2">$10,000</td>
            </tr>
            <tr className='hover:bg-green-600'>
              <td className=" px-4 py-2">2</td>
              <td className=" px-4 py-2">New York</td>
              <td className=" px-4 py-2">$8,000</td>
            </tr>
            <tr className='hover:bg-green-600'>
              <td className=" px-4 py-2">3</td>
              <td className=" px-4 py-2">Texas</td>
              <td className=" px-4 py-2">$6,500</td>
            </tr>
            <tr className='hover:bg-green-600'>
              <td className=" px-4 py-2">3</td>
              <td className=" px-4 py-2">Texas</td>
              <td className=" px-4 py-2">$6,500</td>
            </tr>
            <tr className='hover:bg-green-600'>
              <td className=" px-4 py-2">3</td>
              <td className=" px-4 py-2">Texas</td>
              <td className=" px-4 py-2">$6,500</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Sales_State = () => {
    return (
        <div>
            <div className='p-5 flex gap-5'>
                <ListItems />
                <TopSalesArea/>
            </div>
        </div>
    );
};

export default Sales_State;
