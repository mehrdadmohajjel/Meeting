using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingPlace;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingPlace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static string AddPlace(InputAddPlace values, string token)
        {
            var url = $"{BaseUrl}/MeetingPlace/";
            const string methodName = nameof(AddPlace);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static string EditMeetingPlace(InputEditMeetingPlace values, string token)
        {
            var url = $"{BaseUrl}/MeetingPlace/";
            const string methodName = nameof(EditMeetingPlace);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static string DeleteMeetingPlace(InputDeleteMeetingPlace values, string token)
        {
            var url = $"{BaseUrl}/MeetingPlace/";
            const string methodName = nameof(DeleteMeetingPlace);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }


        public static OutputGetAllMeetingPlace[] GetAllMeetingPlace()
        {
            var url = $"{BaseUrl}/MeetingPlace/";
            const string methodName = nameof(GetAllMeetingPlace);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetAllMeetingPlace[]>.Post(
                        url,
                        methodName, parameters: null)
            );

            return task.GetAwaiter().GetResult();
        }
    }
}