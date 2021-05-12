using Domain;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastucture.Persistence
{
    public class SeedParkData
    {
        public static async Task Seed(ApplicationDbContext db)
        {
            if (db.Parks.Any()) return;

            Dictionary<string, Park> parkDict = new Dictionary<string, Park>();
            List<Park> parksList = new List<Park>();
            var text = File.ReadAllText(@"C:\Users\DerekOwens\source\repos\Parkedex\Infrastucture\Files\np_short.json");
            parkDict = JsonConvert.DeserializeObject<Dictionary<string, Park>>(text);

            foreach (KeyValuePair<string, Park> park in parkDict)
            {
                parksList.Add(park.Value);
                
            }

            parksList.Sort((x, y) => x.FullName.CompareTo(y.FullName));

            await db.Parks.AddRangeAsync(parksList);
            await db.SaveChangesAsync();
        }
    }
}
