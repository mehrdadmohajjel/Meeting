using System.Threading.Tasks;
using Mohajjel.MeetingSystem.Shared.Models.Input.Calendar;
using Mohajjel.MeetingSystem.Shared.Models.Output.Calendar;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetAllYears[] GetAllYears()
        {
            var url = $"{BaseUrl}/Calendar/";
            const string methodName = nameof(GetAllYears);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetAllYears[]>.Post(
                        url,
                        methodName, parameters: null)
            );

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetSpecialMonthDays[] GetSpecialMonthDays(InputGetSpecialMonthDays values)
        {
            var url = $"{BaseUrl}/Calendar/";
            const string methodName = nameof(GetSpecialMonthDays);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetSpecialMonthDays[]>.Post(
                        url,
                        methodName, parameters: values)
            );

            return task.GetAwaiter().GetResult();
        }
        
        public static OutputGetSpecialDay GetSpecialDay(InputGetSpecialDay values)
        {
            var url = $"{BaseUrl}/Calendar/";
            const string methodName = nameof(GetSpecialDay);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetSpecialDay>.Post(
                        url,
                        methodName, parameters: values)
            );

            return task.GetAwaiter().GetResult();
        }
    }
}