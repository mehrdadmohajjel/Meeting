using Mohajjel.MeetingSystem.Shared.Models.Input.EditMeeting;
using Mohajjel.MeetingSystem.Shared.Models.Output.EditMeeting;
using System.Threading.Tasks;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetDabirActiveMeeting[] GetDabirActiveMeeting(InputGetDabirActiveMeeting values, string token)
        {
            var url = $"{BaseUrl}/EditMeeting/";
            const string methodName = nameof(GetDabirActiveMeeting);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetDabirActiveMeeting[]>.Post(
                    url,
                    methodName, parameters: values, token: token)
            );
            return task.GetAwaiter().GetResult();
        }

        public static OutputGetUserMeetingByMeetingId GetUserMeetingByMeetingId(InputGetUserMeetingByMeetingId input, string token)
        {
            var url = $"{BaseUrl}/EditMeeting/";
            const string methodName = nameof(GetUserMeetingByMeetingId);

            var task = Task.Run(async () => await ApiConnector<OutputGetUserMeetingByMeetingId>.Post(url, methodName, token, input));

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetAllAttendPeopleByMeetingId[] GetAllAttendPeopleByMeetingId(InputGetAllAttendPeopleByMeetingId input, string token)
        {
            var url = $"{BaseUrl}/EditMeeting/";
            const string methodName = nameof(GetAllAttendPeopleByMeetingId);

            var task = Task.Run(async () => await ApiConnector<OutputGetAllAttendPeopleByMeetingId[]>.Post(url, methodName, token, input));

            return task.GetAwaiter().GetResult();
        }

        public static string EditMyMeeting(InputEditMyMeeting values, string token)
        {
            var url = $"{BaseUrl}/EditMeeting/";
            const string methodName = nameof(EditMyMeeting);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetEmployeeListByUserTypeAndMeetingIdForMeeting[] GetEmployeeListByUserTypeAndMeetingIdForMeeting
            (InputGetEmployeeListByUserTypeAndMeetingIdForMeeting input, string token)
        {
            var url = $"{BaseUrl}/EditMeeting/";
            const string methodName = nameof(GetEmployeeListByUserTypeAndMeetingIdForMeeting);

            var task = Task.Run(async () => await ApiConnector<OutputGetEmployeeListByUserTypeAndMeetingIdForMeeting[]>.Post(url, methodName, token, input));

            return task.GetAwaiter().GetResult();
        }

    }
}