using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingManagementReport;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingReportByDepartment;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingManagementReport;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingReportByDepartment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static  partial class ApiList
    {
        public static OutputGetUserDepartmentListWithPermission[] GetUserDepartmentListWithPermission(InputGetUserDepartmentListWithPermission values, string token)
        {
            var url = $"{BaseUrl}/MeetingManagementReport/";
            const string methodName = nameof(GetUserDepartmentListWithPermission);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetUserDepartmentListWithPermission[]>.Post(
                    url,
                    methodName, parameters: values, token: token)
            );
            return task.GetAwaiter().GetResult();
        }
        public static OutputGetUserDepartmentList[] GetUserDepartmentList(InputGetUserDepartmentList values, string token)
        {
            var url = $"{BaseUrl}/MeetingManagementReport/";
            const string methodName = nameof(GetUserDepartmentList);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetUserDepartmentList[]>.Post(
                    url,
                    methodName, parameters: values, token: token)
            );
            return task.GetAwaiter().GetResult();
        }
        public static OutputGetMeetingManagementReportByDate[] GetMeetingManagementReportByDate(InputGetMeetingManagementReportByDate values, string token)
        {
            var url = $"{BaseUrl}/MeetingManagementReport/";
            const string methodName = nameof(GetMeetingManagementReportByDate);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingManagementReportByDate[]>.Post(
                    url,
                    methodName, parameters: values, token: token)
            );
            return task.GetAwaiter().GetResult();
        }
    }
}