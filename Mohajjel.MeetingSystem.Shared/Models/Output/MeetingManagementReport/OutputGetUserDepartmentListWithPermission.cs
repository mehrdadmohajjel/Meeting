namespace Mohajjel.MeetingSystem.Shared.Models.Output.MeetingManagementReport
{
    public class OutputGetUserDepartmentListWithPermission
    {
        public string soft_Code { get; set; }
        public string form_Code { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentTitle { get; set; }
        public long ID_Rec { get; set; }
        public string UnitCode { get; set; }
    }
}

