using Spydersoft.Home.Frontend.Models;

namespace Spydersoft.Home.Frontend.Tests
{
    public class OptionsTests
    {

        [Test]
        public void UserInfoDefaults()
        {
            var options = new UserInfo();
            Assert.Multiple(() =>
            {
                Assert.That(options.IsAuthenticated, Is.False);
                Assert.That(options.Name, Is.Null);
            });
        }
    }
}
