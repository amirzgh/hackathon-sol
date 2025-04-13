// import { getReviews, reviewer_transaction } from '@/functionalities/new';
// import { useWorkspaceRecommendation } from '@/hooks/use-workspace-recommendation';
// function TestAi() {
    
// //   const { fetchRecommendation, recommendation, loading, error } = useWorkspaceRecommendation();

// //   const handleClick = async () => {
// //     fetchRecommendation('making zoom call', { plugs: 1, noice: 1, wifi_speed: 1, crowdence: 1})
// //   }

// //   return (
// //     <div>
// //         <button onClick={handleClick}>click me soooooon.</button>
// //         {loading && <p>Loading...</p>}
// //         {error && <p>Error: {error}</p>}
// //         {recommendation && (
// //           <div>
// //             {JSON.stringify(recommendation, null, 2)}
// //           </div>
// //         )}
// //     </div>)
// const handleClick = async () => {
//     try {
//       await reviewer_transaction('wkspace_1', 'reviewer_1', 
//         {
//           venue: 'wkspace_1',
//           metrics: {
//             crowdedness: 7,
//             noise_level: 6,
//             charging_plug_availability: 9,
//             internet_speed: 3,
//         }
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

// const handleFetch = async () => {
//     const res = getReviews('wkspace_1');
//     console.log(await res);
// }  

//   return (
//     <div className='flex flex-col gap-4'>
//         <button onClick={handleClick}>click me soooooon.</button>
//         <button onClick={handleFetch}>get reviews</button>
//     </div>
//   )
// }

// export {TestAi}