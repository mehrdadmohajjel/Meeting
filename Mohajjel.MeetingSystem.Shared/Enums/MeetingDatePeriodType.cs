using System.ComponentModel.DataAnnotations;

namespace Mohajjel.MeetingSystem.Shared.Enums
{
    public enum MeetingDatePeriodType
    {
        [Display(Name = "نمایش جلسات برگزار شده طی هفته گذشته")]
        LastWeek = 1,

        [Display(Name = "نمایش جلسات هفته جاری")]
        CurrentWeek = 2,

        [Display(Name = "نمایش جلسات هفته بعد")]
        NextWeek = 3,

        [Display(Name = "انتخاب بازه زمانی خاص")]
        SpecialDate = 4
    }
}