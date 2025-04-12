import { useEffect } from 'react';
import { useWorkspaceRecommendation } from '@/hooks/use-workspace-recommendation';
function TestAi() {
    
  const { fetchRecommendation, recommendation, loading, error } = useWorkspaceRecommendation();
  useEffect(()=>{
    if(recommendation){
      // Handle the recommendation here, e.g., display it in a modal or alert
      console.log('Recommendation:', recommendation);
    }
  },[recommendation])

  const handleClick = async () => {
    fetchRecommendation('making zoom call', { plugs: 1, noice: 1, wifi_speed: 1, crowdence: 1})
  }

  return (
        <button onClick={handleClick}>click me soooooon.</button>
)
}

export {TestAi}