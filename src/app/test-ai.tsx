import { useWorkspaceRecommendation } from '@/hooks/use-workspace-recommendation';
function TestAi() {
    
  const { fetchRecommendation, recommendation, loading, error } = useWorkspaceRecommendation();

  const handleClick = async () => {
    fetchRecommendation('making zoom call', { plugs: 1, noice: 1, wifi_speed: 1, crowdence: 1})
  }

  return (
    <div>
        <button onClick={handleClick}>click me soooooon.</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {recommendation && (
          <div>
            {JSON.stringify(recommendation, null, 2)}
          </div>
        )}
    </div>
        
)
}

export {TestAi}