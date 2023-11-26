using System.Threading.Tasks;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategoryReport;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategoryReport;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetMeetingReportByCategoryId[] GetMeetingReportByCategoryId(InputGetMeetingReportByCategoryId values, string token)
        {
            var url = $"{BaseUrl}/MeetingCategoryReport/";
            const string methodName = nameof(GetMeetingReportByCategoryId);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingReportByCategoryId[]>.Post(
                    url,
                    methodName, parameters: values, token: token)
            );
            return task.GetAwaiter().GetResult();
        }





























        //public static string AddMeetingNewObservation(InputAddMeetingNewObservation values)
        //{
        //    var url = $"{BaseUrl}/MeetingCategoryReport/";
        //    const string methodName = nameof(AddMeetingNewObservation);

        //    var task = Task.Run(
        //        async () =>
        //            await ApiConnector<string>.Post(
        //                url,
        //                methodName, parameters: values, token: null)
        //    );

        //    return task.GetAwaiter().GetResult();
        //}

        //public static OutputGetMeetingObservationListByMeetingId[] GetMeetingObservationListByMeetingId(InputGetMeetingObservationListByMeetingId values)
        //{
        //    var url = $"{BaseUrl}/MeetingCategoryReport/";
        //    const string methodName = nameof(GetMeetingObservationListByMeetingId);

        //    var task = Task.Run(
        //        async () => await ApiConnector<OutputGetMeetingObservationListByMeetingId[]>.Post(
        //            url,
        //            methodName, parameters: values, token: null)
        //    );
        //    return task.GetAwaiter().GetResult();
        //}

        //public static OutputGetAllUsersList[] GetAllUsersList(InputGetAllUsersList values)
        //{
        //    var url = $"{BaseUrl}/MeetingCategoryReport/";
        //    const string methodName = nameof(GetAllUsersList);

        //    var task = Task.Run(
        //        async () => await ApiConnector<OutputGetAllUsersList[]>.Post(
        //            url,
        //            methodName, parameters: values)
        //    );
        //    return task.GetAwaiter().GetResult();
        //}

        //public static OutputGetMeetingTranscriptList[] GetMeetingTranscriptList(InputGetMeetingTranscriptList values)
        //{
        //    var url = $"{BaseUrl}/MeetingCategoryReport/";
        //    const string methodName = nameof(GetMeetingTranscriptList);

        //    var task = Task.Run(
        //        async () => await ApiConnector<OutputGetMeetingTranscriptList[]>.Post(
        //            url,
        //            methodName, parameters: values, token: null)
        //    );
        //    return task.GetAwaiter().GetResult();
        //}

        //public static string AddNewMeetingTranscript(InputAddNewMeetingTranscript values, string token)
        //{
        //    var url = $"{BaseUrl}/MeetingCategoryReport/";
        //    const string methodName = nameof(AddNewMeetingTranscript);

        //    var task = Task.Run(
        //        async () =>
        //            await ApiConnector<string>.Post(
        //                url,
        //                methodName, parameters: values, token: token)
        //    );

        //    return task.GetAwaiter().GetResult();
        //}

        //public static string DeleteMeetingTranscript(InputDeleteMeetingTranscript values, string token)
        //{
        //    var url = $"{BaseUrl}/MeetingCategoryReport/";
        //    const string methodName = nameof(DeleteMeetingTranscript);

        //    var task = Task.Run(
        //        async () =>
        //            await ApiConnector<string>.Post(
        //                url,
        //                methodName, parameters: values, token: token)
        //    );

        //    return task.GetAwaiter().GetResult();
        //}
    }
}