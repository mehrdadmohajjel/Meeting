using Mohajjel.MeetingSystem.Shared.Models.Input.AddMeeting;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddMeeting;
using Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings;
using System.Threading.Tasks;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetCategoryDetailByCategoryId[] GetCategoryDetailByCategoryId(InputGetCategoryDetailByCategoryId values)
        {
            var url = $"{BaseUrl}/AddMeeting/";
            const string methodName = nameof(GetCategoryDetailByCategoryId);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetCategoryDetailByCategoryId[]>.Post(
                    url,
                    methodName, parameters: values)
            );
            return task.GetAwaiter().GetResult();
        }


        public static OutputGetMeetingAttendanceList[] GetEmployeeListByDepartmentId(InputGetEmployeeListByDepartmentId values)
        {
            var url = $"{BaseUrl}/AddMeeting/";
            const string methodName = nameof(GetEmployeeListByDepartmentId);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingAttendanceList[]>.Post(
                    url,
                    methodName, parameters: values)
            );
            return task.GetAwaiter().GetResult();
        }

        public static OutputGetMeetingAttendanceList[] GetUserList()
        {
            var url = $"{BaseUrl}/AddMeeting/";
            const string methodName = nameof(GetUserList);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingAttendanceList[]>.Post(
                    url,
                    methodName, parameters: null)
            );
            return task.GetAwaiter().GetResult();
        }

        
        public static OutputGetMeetingAttendanceList[] GetUserListWithOrganizationLevel(InputGetUserListWithOrganizationLevel values)
        {
            var url = $"{BaseUrl}/AddMeeting/";
            const string methodName = nameof(GetUserListWithOrganizationLevel);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingAttendanceList[]>.Post(
                    url,
                    methodName, parameters: values)
            );
            return task.GetAwaiter().GetResult();
        }


        public static string FinilizeNewMeeting(InputFinilizeNewMeeting values, string token)
        {
            var url = $"{BaseUrl}/AddMeeting/";
            const string methodName = nameof(FinilizeNewMeeting);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }
        
        public static OutputGetMeetingNumberByMeetingCategoryId GetMeetingNumberByMeetingCategoryId(InputGetMeetingNumberByMeetingCategoryId values)
        {
            var url = $"{BaseUrl}/AddMeeting/";
            const string methodName = nameof(GetMeetingNumberByMeetingCategoryId);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingNumberByMeetingCategoryId>.Post(
                    url,
                    methodName, parameters: values)
            );
            return task.GetAwaiter().GetResult();
        }

        public static OutputGetEmployeeListByUserTypeForMeeting[] GetEmployeeListByUserTypeForMeeting(InputGetEmployeeListByUserTypeForMeeting input, string token)
        {
            var url = $"{BaseUrl}/AddMeeting/";
            const string methodName = nameof(GetEmployeeListByUserTypeForMeeting);

            var task = Task.Run(async () => await ApiConnector<OutputGetEmployeeListByUserTypeForMeeting[]>.Post(url, methodName, token, input));

            return task.GetAwaiter().GetResult();
        }
    }
}